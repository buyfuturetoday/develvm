Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Operations-architecture.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[wiki]] > [[Technical Architecture]]

h1. Operations Architecture

The Operations Architecture consists of the following components:
* Scalr control panel
* Webmin


h1. Processes

h2. Backups

* Image backups: Scheduled backups (budnling tasks) in Scalr
* OS backups - use webmin in addition to Scalr?
* Database backups - scheduled in Scalr
* Offsite storage of backups - Scalr automatically stores database backups in Amazon S3



h1. Tools

h2. Scalr

The scalr dashboard is used for most operational issues such as backup/restore etc.


h2. Webmin

...