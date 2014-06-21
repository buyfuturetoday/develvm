

runs<-function(list, pos=0, neg=0, current=0) {
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
     return( c( v, runs(t, pos, neg, current)) );
  }
}

sample = c(1,2,3,43,4,3,2,1,1,2,3,4,5,5,5,2,1,0)
runs(sample)
