import argparse
import time
from BlackVenom.BlackVenom import BlackVenom

def main():
    parser = argparse.ArgumentParser(description="BlackVenom: ARP Spoofing Tool")
    parser.add_argument('--target_ip', type=str, help="The IP address of the target machine.")
    parser.add_argument('--gateway_ip', type=str, help="The IP address of the gateway.")
    parser.add_argument('--interface', type=str, default='eth0', help="Network interface to use (default is 'eth0').")
    parser.add_argument('--queue_num', type=int, default=1, help="Queue number for NetfilterQueue (default is 1).")
    
    args = parser.parse_args()

    # Create an instance of BlackVenom
    black_venom = BlackVenom(interface=args.interface, queue_num=args.queue_num)

    # Start the ARP spoofing process
    black_venom.start_spoofing(args.target_ip, args.gateway_ip)

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        black_venom.stop_spoofing()

if __name__ == "__main__":
    main()