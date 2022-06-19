
## Using cypress in Windows WSL2

To use `cypress open`, when using WSL2 with Ubuntu 20, it is necessary to install Windows X server and add need to run a few shell commands as follows:
1. Install the packages as follows:
```
apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
```
2. Download the VcXrv windows X-server from here in Windows: `https://sourceforge.net/projects/vcxsrv/`, and install it.
3. Set installation settings - Multiple windows, Start no client, and check all the checkboxes in the Extra Settings.
4. Setup the display environment as follows:
```
set DISPLAY variable to the IP automatically assigned to WSL2
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0

# confirm Display is set. This should display the IP address associated with WSL2.
echo Display
```
5. Enable the D-Bus for VcXrv to internally communicate:
```
sudo /etc/init.d/dbus start &> /dev/null
sudo visudo -f /etc/sudoers.d/dbus
```
6. In the editor that launches, add the following with username:
```
<your_username> ALL = (root) NOPASSWD: /etc/init.d/dbus
```
7. Then on Windows Control Panel set up the permission for VcXsrv:
```
Control Panel > System and Security > Windows Defender Firewall > Advance > Inbound Rules > New Rule

Select Rule Type = Program > Next > Profile - Check Domain, Private, Public > Next > Add the location of the Vxxrv.exe file in the windows
Program Files > Next Give it a suitable name > Finish.
```
8. Go to WSL2 terminal, and do cypress open. It should open the test window.
   - Ignore error in the console:
   ```
   [12015:0619/121101.197071:ERROR:bus.cc(397)] Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")
   ```
  - If the UI doesn't popup, look for it in the task bar.

## Tips
1. Add the shell commands from above in the .bashrc in WSL2, so that it runs automatically when you open a terminal window:
```
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0
echo Display
sudo /etc/init.d/dbus start &> /dev/null
```
2. If for some reason it is necessary to clear the cypress cache, use
```
cypress cache clear
# Then reinstall cypress directly from the node_modules
./node_modules/.bin/cypress install
```
3. If you see a verify timeout when starting cypress with `cypress open` or `cypress run`, change the `VERIFY_TEST_RUNNER_TIMEOUT_MS` value in `node_modules/cypress/lib/tasks/verify.js` to 100000. This will help you to get a better diagnosis of the problem.
4. When using WSL2 environment, after a Windows restart, you will need to re-launch the VcXrv by using `XLauch` and setting the configurations as shown in the **Set installation settings** above.
Also, it may be be necessary to reconfigure the Windows firewal as described above.
