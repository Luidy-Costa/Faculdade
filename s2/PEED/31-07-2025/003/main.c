#include <stdio.h>
#include <stdlib.h>

void teste (int *px){
    ++*px;
};

int main()
{
    int a = 1;
    teste(&a);
    printf("%d",a);
    return 0;
}
