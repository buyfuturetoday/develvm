RUnit example
------------

Just run these commands:

```
require("RUnit")

## How to run the tests (do not uncomment in this file,
## but execute the commands at the R prompt):
## All you have to do is to adapt the directory locations.
## ------------------------------------------------

## define the test suite:
testsuite.cf <- defineTestSuite("cfConversion", dirs=".")

## run test suite:
testResult <- runTestSuite(testsuite.cf)

## print text protocol to console:
printTextProtocol(testResult)

## print HTML version to a file:
printHTMLProtocol(testResult, fileName="someFileName.html")

## In this case we also have a shortcut
#runTestFile("directoryOfThisFile/runitcfConversion.r")
```

