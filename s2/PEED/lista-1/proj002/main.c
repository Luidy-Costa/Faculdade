#include <stdio.h>

int main(){
    int A;
    int B;
    int save;

    printf("Digite o valor que deseja de A. \n");
    scanf("%d",&A);

    printf("Digite o valor que deseja de B. \n");
    scanf("%d",&B);

    printf("os valores A e B respctivamente são %d %d \n", A,B);

    save = A;
    A = B;
    B = save;

    printf("os valores A e B respctivamente são %d %d", A,B);

    return 0;
}
