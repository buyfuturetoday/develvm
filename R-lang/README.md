Executing scripts
----------------

Run R scripts like this:

	>R --no-save <func.R >out.txt
	>cat out.txt

Or like this:

	>R CMD BATCH func.R
	>cat func.Rout

Or like this:
	>R
	>source("func.R", echo=TRUE)



Install new packages
-------------------

Install directly from CRAN (also possible to download and install with R CMD INSTALL): 

	>install.packages("RUnit", repos='http://cran.us.r-project.org')
	>require("RUnit")

Or specify the path where to install (better)

	>install.packages("RUnit", lib="./R-packages/", repos='http://cran.us.r-project.org')
	>require("RUnit", lib="./R-packages/")


Check version loaded:

	>packageVersion("RUnit")


```
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
```



Rprofile
-------

Put this in `~/.Rprofile` and you don't need to specify the CRAN mirror all the time:

```
## Default repo
local({r <- getOption("repos")
       r["CRAN"] <- "http://cran.r-project.org" 
       options(repos=r)
})
```



Some other commands
-------------------

>sessionInfo()
>version
>ls
