Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Technical-architecture.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


These pages describes an outdated architecture for Gizur OM. These pages are kept for reference.

# Technical Architecture

## Overview

### Server farm

The architecture is built around three layers:

 1. A load balancer
 1. Application server cluster - running apache and PHP where scaling is performed by automatically launching and terminating new instances
 1. Database server cluster - a Master/Slave cluster running MySQL

These servers make up a server farm.

### Environments

vTiger environments are created in the server farm. For each environment is a MySQL user and database created in the MySQL server. Each environment also has a separate vTiger installation on the application server cluster.

There is a set of vTiger environments used for development, test and production:

 1. Sandbox environment - used for "playing around". This environment is "reset" when needed
 1. Development environment - used for development and unit testing of new functionality
 1. Test environment - used for system and acceptance testing
 1. Production environment - each client has a separate environment

It is possible to create temporary environments (vTiger installation + MySQL database) by copying an existing environment. 



## Architecture details

 * [[Execution Architecture]]
 * [[Operations Architecture]]
 * [[Development Architecture]]
 * [[Performance tuning]]
