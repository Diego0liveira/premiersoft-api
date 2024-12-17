#!/usr/bin/env bash

host="$1"
port="$2"

if [ -z "$host" ] || [ -z "$port" ]; then
  echo "Usage: wait-for-it host port"
  exit 1
fi

while ! nc -z "$host" "$port"; do
  echo "Waiting for $host:$port to be available..."
  sleep 2
done

echo "$host:$port is up!"
