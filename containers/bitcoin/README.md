bitcoind server
==============

IMPORTANT NOTE: The configuration has been set to use the testnet. This means that all
transactions are fake, i.e. not real. This can be changed in the config file.

IMPORTANT NOTE 2: If you change the configuration to use the real bitcoin net, remember that 
bitcoins have value. Make sure you keep a backup of the wallet if you send 
bitcoins to the server. A good way to do this is to use docker volumes, see below.


Start a server
--------------

1. Create an image: `docker build .`
2. Start a bitcoin server: `docker run -d <image id>`
3. Check the logs: `docker logs <container id>`


Getting started
---------------

First you need to install bitcoind also in the client (where you want to run the command):
`apt-get install -y bitcoind`. Then check the IP adress of the server: 
`docker inspect $BITCOIND`. Now update the file `profile` with the the IP adress.
Finally do `source profile` and you're all set. Test that you have a connection
with the server with `bc help`. A list of commands should be showed.

First you need to get some bitcoins to test with. This can be done here: http://tpfaucet.appspot.com/
Or just google `bitcoin testnet faucet`

1. Add the testnet node used above (replace IP if not using tpfaucet.appspot.com): bc addnode 54.243.211.176 add
1. Create a new address and associate it to an account: `bc getnewaddress account1`
2. Goto the testnet site found above and enter the new testnet adress
3. Wait a while and check if the bitcoins have arrived: `bc getbalance account1`


Now you can play around with the bitcoins you have received:

1. Create a new address and associate it to an account: `bc getnewaddress account1`
2. Create a new address and associate it to an account: `bc getnewaddress account2`
3. List the addresses: `bc getaddressesbyaccount account1`
4. List the addresses: `bc getaddressesbyaccount account2`
5. Send from one account to another: `bc sendfrom account1 <to adress> <amount>`
6. List balance: `bc getbalance account1`
7. List balance: `bc getbalance account2`
8. List transactions: `bc getreceivedbyaccount account1`


Check status of things:

1. List connected peers: `bc getpeerinfo`
2. List all accounts: `bc listaccounts`
3. List versions: `bc getinfo`

Finally, send back the testnet bitcoins:

1. Send from one account to another: `bc sendfrom account1 mmhmMNfBiZZ37g1tgg2t8DDbNoEdqKVxAL <amount>`


docker volumes
-------------

Read about docker volumes here:  http://docs.docker.io/en/latest/use/working_with_volumes/


Update pre-build bitcoind version
---------------------------------

Pre-build bitcoind versions can be downloaded here: http://packages.debian.org/sv/sid/bitcoind

