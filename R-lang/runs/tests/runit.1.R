## This is a very trivial demo  of
## the RUnit test case execution system:
## ---------------------------------


## Install RUnit
if(require("RUnit", lib="./R-packages/")){
    print(paste("RUnit is loaded correctly. Version:", toString(packageVersion("RUnit"))))
} else {
    print("trying to install RUnit")
    dir.create(file.path(".", "R-packages"), showWarnings = FALSE)
    install.packages("RUnit", lib="./R-packages/", repos='http://cran.us.r-project.org')
    if(require("RUnit", lib="./R-packages/")){
        print(paste("RUnit is loaded correctly. Version:", toString(packageVersion("RUnit"))))
    } else {
        stop("could not install RUnit")
    }
}

# Install runs
if(require("runs", lib="./R-packages/")){
    print(paste("runs is loaded correctly. Version:", toString(packageVersion("runs"))))
} else {
    print("trying to install runs")
    dir.create(file.path(".", "R-packages"), showWarnings = FALSE)
    install.packages("../../runs", lib="./R-packages/", repos = NULL, type="source")
    if(require("runs", lib="./R-packages/")){
        print(paste("runs is loaded correctly. Version:", toString(packageVersion("runs"))))
    } else {
        stop("could not install runs")
    }
}

## functions to be tested (usually defined in a different
## file from where the test cases are located):

## centigrade to Fahrenheit
c2f <- function(c) return(9/5 * c + 32)

## Fahrenheit to centigrade
f2c <- function(f) return(5/9 * f - 32)  ## ups, a bug (brackets missing)



## test functions:
## ---------------------


.setUp <- function() {  ## called before each test case, see also .tearDown()
  print(".setUp")
}

test.c2f <- function() {
  checkEquals(c2f(0), 32)
  checkEquals(c2f(10), 50)
  ## check that an error is created for a bogus argument
  checkException(c2f("xx"))
}


test.f2c <- function() {
  checkEquals(f2c(32), 0)
  checkEquals(f2c(50), 10)
  ## check that an error is created for a bogus argument
  checkException(f2c("xx"))
}

test.errordemo <- function() {
  stop("this is just to show what an error looks like as opposed to a failure")
}
