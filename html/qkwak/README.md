Qkwak
=====

This is a simple static HTML page with a PayPal button. It using the Twitter Bootstrap 
theme. Install the theme using  `bower install`. Bower is installed with `npm install -g bower`.

The site is published using Amazon on this adress: http://qkwak.s3-website-eu-west-1.amazonaws.com/#

Howto setup S3 buckets for web-sites is described here:
Publish site using Amazon S3: http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html


Bucket policy:

```
{
  "Version":"2012-10-17",
  "Statement":[{
	"Sid":"AddPerm",
        "Effect":"Allow",
	  "Principal": {
            "AWS": "*"
         },
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::qkwak.com/*"
      ]
    }
  ]
}
```
