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

	> install.packages("runit", lib="./R-packages/")


