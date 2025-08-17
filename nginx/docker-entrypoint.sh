#!/bin/sh

# Generate SSL certificate if it doesn't exist
if [ ! -f /etc/ssl/certs/localhost.crt ]; then
    echo "Generating SSL certificate..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/ssl/private/localhost.key \
        -out /etc/ssl/certs/localhost.crt \
        -subj '/C=US/ST=State/L=City/O=Organization/CN=localhost'
fi

# Start nginx
exec nginx -g 'daemon off;'
