#include <stdio.h>
#include <stdlib.h>

int main()
{
   int v[3] = {10,20,30};
   int *p;
   p = v;
   *(p+1) = 15;

   printf("%d",*p);

   ++p;

      printf("%d",*p);

    return 0;
}
