Need to make changes to Elastic Beanstalk servers?

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Customized elastic beanstalk)
[meta:date]: <> (2012-08-10)
[meta:nested:key]: <> (Metadata value)

##!!truncate


You can't update the httpd.conf from AWS console. You must login and crate a new AMI and then configure Beanstalk to use this AMI though.

* http://serverfault.com/questions/373092/how-to-configure-apache-on-amazon-elastic-beanstalk

* http://docs.amazonwebservices.com/elasticbeanstalk/latest/dg/using-features.customami.html
