import argparse
import time
from BlackVenom.BlackVenom import BlackVenom

def main():
    parser = argparse.ArgumentParser(description="BlackVenom 🖤: Ethical Hacking ARP and DNS Spoofing Tool")
    
    # Main arguments for ARP Spoofing
    parser.add_argument('--target_ip', type=str, required=True, help="The IP address of the target machine.")
    parser.add_argument('--gateway_ip', type=str, required=True, help="The IP address of the gateway.")
    parser.add_argument('--interface', type=str, default='eth0', help="Network interface to use (default is 'eth0').")
    
    # Arguments for Packet Logging
    parser.add_argument('--logger_queue_num', type=int, default=1, help="Queue number for packet logging (default is 1).")
    parser.add_argument('--enable_logging', action='store_true', help="Enable packet logging to a pcap file.")
    parser.add_argument('--log_file', type=str, default="captured_packets.pcap", help="Path to pcap file for logging packets (used only if logging is enabled).")
    
    # Arguments for DNS Spoofing
    parser.add_argument('--spoof_dns', action='store_true', help="Enable DNS spoofing.")
    parser.add_argument('--attacker_ip', type=str, help="IP address to which DNS requests should be redirected (required if --spoof_dns is enabled).")
    parser.add_argument('--dns_queue_num', type=int, default=2, help="Queue number for DNS spoofing (default is 2).")

    args = parser.parse_args()

    # Validation to ensure attacker_ip is provided when spoof_dns is enabled
    if args.spoof_dns and not args.attacker_ip:
        parser.error("--attacker_ip is required when --spoof_dns is enabled.")

    # Instantiate BlackVenom with all configurations
    black_venom = BlackVenom(
        interface=args.interface,
        logger_queue_num=args.logger_queue_num,
        dns_queue_num=args.dns_queue_num,
        enable_logging=args.enable_logging,
        log_file=args.log_file,
        attacker_ip=args.attacker_ip,
        spoof_dns=args.spoof_dns
    )

    # Start ARP Spoofing (and DNS Spoofing if enabled)
    black_venom.start_spoofing(args.target_ip, args.gateway_ip)

    try:
        print("🌐 Spoofing started. Press Ctrl+C to stop.")
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("🛑 Stopping spoofing and logging...")
        black_venom.stop_spoofing()

if __name__ == "__main__":
    main()