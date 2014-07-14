runs - homemade package that calculates runs in a time series
=============================================================

Import like this (will also install in a local folder):
=======
Import like this (in directory .. ):

```
if(require("runs", lib="./R-packages/")){
    print(paste("runs is loaded correctly. Version:", toString(packageVersion("runs"))))
} else {
    print("trying to install runs")
    dir.create(file.path(".", "R-packages"), showWarnings = FALSE)
    install.packages("runs", lib="./R-packages/", repos = NULL, type="source")
    if(require("runs", lib="./R-packages/")){
        print(paste("runs is loaded correctly. Version:", toString(packageVersion("runs"))))
    } else {
        stop("could not install runs")
    }
}
```


Use like this:

```
# Input vector
sample = c(1,2,3,43,4,3,2,1,1,2,3,4,5,5,5,2,1,0)

# Create runs objects
x <- runs("first test", sample)

# Show class for x and y
class(x)

# Show the object
print(x)
```


Check that the result is what we expected:

```
expected_result <- c(1,1,1,-1,-1,-1,-1,0,2,2,2,2,0,0,-2,-2,-2)

x$runs == expected_result
```



Unit tests
----------

```
## How to run the tests (do not uncomment in this file,
## but execute the commands at the R prompt):
## All you have to do is to adapt the directory locations.
## ------------------------------------------------

## define the test suite:
testsuite.cf <- defineTestSuite("runs", dirs="./tests")

## run test suite:
testResult <- runTestSuite(testsuite.cf)

## print text protocol to console:
printTextProtocol(testResult)

## print HTML version to a file:
printHTMLProtocol(testResult, fileName="runsUnitTests.html")

## In this case we also have a shortcut
#runTestFile("directoryOfThisFile/runitcfConversion.r")
```







