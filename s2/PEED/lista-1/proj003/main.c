#include <stdio.h>

int main(){

    int n1;
    int n2;

    printf("diga um valor para o n1\n" );
    scanf("%d", &n1);

    printf("diga um valor para o n2\n" );
    scanf("%d", &n2);

    if (n1 > n2){

        printf("%d, %d",n1,n2);

    }else{

      printf("%d, %d",n2,n1);

    }

}
