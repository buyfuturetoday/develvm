#
# Simple class that calculates runs in a vector
#

# Create a class object runs
runs <- function(name, in_vector) {
     # The object only have two attributes
     out <- list(name=name, vector=in_vector, runs=.calcRuns(in_vector))

     # Set the class the for this object
     class(out) <- "runs"

     # return without printing
     invisible(out)
}

# Print method for runs class
print.runs <- function(object) {
     cat("Name:", object$name, "\ninput:", object$vector, "\n")
     print(object$runs)
}

# Private function that calculates the runs
.calcRuns<-function(list, pos=0, neg=0, current=0) {
  l = length(list);
  if(l<=1) {
     return( c() );
  }
  else {
     h1 = head(list,1);
     t = tail(list,l-1);
     h2 = head(t,1);

     v = 0;
     if(h1<h2) {
          if(current<=0) current = pos = pos +1;
          v = pos;
     }
     if(h1>h2) {
          if(current>=0) current = neg = neg - 1;
          v = neg;
     }
     return( c( v, .calcRuns(t, pos, neg, current)) );
  }
}
