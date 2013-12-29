bitcoind server
==============

IMPORTANT NOTE: The configuration has been set to use the testnet. This means that all
transactions are fake, i.e. not real. This can be changed in the config file.

IMPORTANT NOTE 2: If you change the configuration to use the real bitcoin net, remember that 
bitcoins have value. Make sure you keep a backup of the wallet if you send 
bitcoins to the server. A good way to do this is to use docker volumes, see below.


Start a server
--------------

1. Create an image: `BITCOIND_IMAGE=(docker build .)`
2. Start a bitcoin server: `BITCOIND=(docker run -d $BITCOIND_IMAGE)`
3. Check the logs: `docker logs $BITCOIND`


Getting started
---------------

First you need to install bitcoind also in the client (where you want to run the command):
`apt-get install -y bitcoind`. Then check the IP adress of the server: 
`docker inspect $BITCOIND`. Now update the file `profile` with the the IP adress.
Finally do `source profile` and you're all set. Test that you have a connection
with the server with `bc help`. A list of commands should be showed.

1. Create a new address and associate it to an account: `bc getnewaddress account1`
2. Create a new address and associate it to an account: `bc getnewaddress account1`
3. Create a new address and associate it to an account: `bc getnewaddress account2`
4. List the addresses: `bc getaddressesbyaccount account1`
4. List the addresses: `bc getaddressesbyaccount account2`


docker volumes
-------------

Read about docker volumes here:  http://docs.docker.io/en/latest/use/working_with_volumes/


