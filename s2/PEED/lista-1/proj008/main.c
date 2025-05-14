#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <locale.h>

int main (){
    setlocale(LC_ALL,"Portuguese");
    int num,i;
    int div = 0;

    puts("Digite um número que deseje verificar");
    scanf("%d", &num);

    system("cls");

    for(i = 1;i<=num;i++){

        if(num%i==0){
            div++;
        }
    }
    if(div > 2){
        printf("%d não é primo", num);
    }else{
    printf("%d é primo", num);
    }
    return 0;
}
