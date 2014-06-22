# Create a class object infant
infant <- function(ID, sex, age, ht, wt) {
     out <- list(ID=ID, sex=sex, data=data.frame(Age=age, HT.cm=ht, WT.kg=wt))
     class(out) <- "infant"
     invisible(out)
}

# Print method for infant class
print.infant <- function(object) {
     cat("ID  =", object$ID, "\nSex =", object$sex, "\n")
     print(object$data)
}

# Plot method for infant class
plot.infant <- function(object) {
     data <- object$data
     par(mfrow=c(1,2))
     plot(data$Age, data$HT.cm, type="o", pch=19, col="blue",
          xlab="Age (months)", ylab="Height (cm)", main="Height vs Age")
     plot(data$Age, data$WT.kg, type="o", pch=19, col="blue",
          xlab="Age (months)", ylab="Weight (kg)", main="Weight vs Age")
     mtext(paste("Subject ",object$ID,", ",toupper(object$sex),sep=""), side=3,
          outer=TRUE, line=-1.5, cex=1.5)
}
