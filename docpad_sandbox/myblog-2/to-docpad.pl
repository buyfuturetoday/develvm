#!/usr/bin/env perl


#
# Check the argument
#

# quit unless we have the correct number of command-line args
$num_args = $#ARGV + 1;
if ($num_args != 1) {
  print "\nUsage: to-docpad.pl file\n";
  exit;
}

# Save the filename in a variable
$filename=$ARGV[0];


#
# Open the source file
#

# Open file for reading
open FILE, "<", "$filename" or die $!;

$buf = "";
$title = false;


while (<FILE>) { 

  # save the title for the header
  if ($_ =~ m/\[meta:title\]: <> \((\w*)/) {
    $org = $_;
    chomp($_);
    $_ =~ s/\[meta:title\]: <> \(([A-Za-z ]*).*/$1/;
    $title = $_;
    $_ = "";
  }

  # save the date for the header
  if ($_ =~ m/\[meta:date\]: <> \((\w*)/) {
    $org = $_;
    chomp($_);
    $_ =~ s/\[meta:date\]: <> \(([0-9\-]*).*/$1/;
    $date = $_;
    $_ = "";
  }

  # save the author for the header
  if ($_ =~ m/\[meta:author\]: <> \((\w*)/) {
    $org = $_;
    chomp($_);
    $_ =~ s/\[meta:author\]: <> \(([a-zA-Z ]*).*/$1/;
    $author = $_;
    $_ = "";
  }

  if ($_ =~ m/\[[meta:nested:key].*\]:/) {
    $_ = "";
  }

  # Get rid of the truncate row
  $_ =~ s/##\!\!truncate//;

  # Save the contents
  $buf .= $_;
}


close(FILE);


#
# Save the modified file
#


$header = <<END;

---
layout: post
title: $title
date: $date
author: $author
---
END

# Open file for writing
open FILE, ">", "$filename" or die $!;

# write the modified contents
print FILE $header . "\n" . $buf;

close(FILE);
