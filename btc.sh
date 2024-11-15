#!/bin/bash
#Browser Terminal Control
send() {
    local string="$1"
    echo "$string" | websocat ws://localhost:8081
}

while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--toggle)
            id="$2"
            send "toggle $search_query"
            shift 2 # Move past the flag and its argument
            ;;
        -n |--new)
            send "newtab $2"
            shift 2 # Move past the flag
            ;;
        -l|--link)
            send "link $2"
            shift 2 # Move past the flag and its argument
            ;;
        *)
            echo "Unknown option: $1"
            shift # Move past the unknown flag
            ;;
    esac
done
