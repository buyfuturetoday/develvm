bitcoind server
==============

IMPORTANT: Bitcoins have value. Make sure you keep a backup of the wallet if you send 
bitcoins to the server. A good way to do this is to use docker volumes, see below.


Start a server
--------------

1. Create an image: `BITCOIND:IMAGE=(docker build .)`
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
4. 


docker volumes
-------------


Read about docker volumes here:  http://docs.docker.io/en/latest/use/working_with_volumes/
