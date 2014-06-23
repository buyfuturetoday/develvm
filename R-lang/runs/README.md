runs - homemade package
-----------------------

Import like this:

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


