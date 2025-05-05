#include <stdio.h>

int main(){
    char sexo[2];
    float altura;
    float imc;

    printf("qual o seu sexo? M/F \n");
    fgets(sexo,2,stdin);
    fflush(stdin);

    printf("qual a sua altura? \n");
    scanf("%f", &altura);
    fflush(stdin);

    if( sexo == 'M'){

        imc = (72.7*altura)-58;
        printf(" seu peso ideal é %.2f \n", imc);

    }else{

        imc = (62.1*altura)-44.7;
        printf(" seu peso ideal é %.2f \n", imc);

    }

    return 0;
}
