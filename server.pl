#!/usr/bin/perl
# 极简静态文件服务器（仅用于本地测试）
use strict;
use warnings;
use IO::Socket::INET;
use Cwd qw(abs_path);
use File::Spec;

my $port = 8410;
my $root = abs_path(__FILE__);
$root =~ s|\\|/|g;
$root =~ s|/server\.pl$|/|;

my $server = IO::Socket::INET->new(
    LocalAddr => '127.0.0.1',
    LocalPort => $port,
    Proto     => 'tcp',
    Listen    => 5,
    ReuseAddr => 1,
) or die "无法监听端口 $port: $!";

print "静态服务器已启动: http://127.0.0.1:$port/  (根目录: $root)\n";

sub mime_type {
    my ($path) = @_;
    return 'text/html; charset=utf-8'  if $path =~ /\.html?$/i;
    return 'text/css; charset=utf-8'   if $path =~ /\.css$/i;
    return 'application/javascript; charset=utf-8' if $path =~ /\.js$/i;
    return 'application/json; charset=utf-8' if $path =~ /\.json$/i;
    return 'image/png'  if $path =~ /\.png$/i;
    return 'image/jpeg' if $path =~ /\.jpe?g$/i;
    return 'image/svg+xml' if $path =~ /\.svg$/i;
    return 'image/x-icon' if $path =~ /\.ico$/i;
    return 'text/plain; charset=utf-8';
}

while (my $client = $server->accept()) {
    my $request = <$client> // '';
    my $path = ($request =~ m|^GET\s+(\S+)|)[0] // '/';
    $path =~ s/\?.*//;
    $path = '/index.html' if $path eq '/';

    # 防目录穿越
    $path =~ s/\.\.//g;
    my $file = $root . $path;

    if (-f $file) {
        open my $fh, '<:raw', $file or do { print $client "HTTP/1.1 500 Internal Server Error\r\n\r\n"; close $client; next; };
        local $/;
        my $content = <$fh>;
        close $fh;
        my $type = mime_type($file);
        my $len = length($content);
        print $client "HTTP/1.1 200 OK\r\nContent-Type: $type\r\nContent-Length: $len\r\nConnection: close\r\n\r\n";
        print $client $content;
    } else {
        my $msg = '404 Not Found';
        print $client "HTTP/1.1 404 Not Found\r\nContent-Type: text/plain; charset=utf-8\r\nContent-Length: " . length($msg) . "\r\nConnection: close\r\n\r\n$msg";
    }
    close $client;
}
