#include <stdio.h>

int main(){
    int anoatual;
    int anonasc;
    int idade;

    printf("Coloque o seu ano de nasciemento \n");
    scanf("%d", &anonasc);
    fflush(stdin);

    printf("coloque o ano atual \n");
    scanf("%d", &anoatual);
    fflush(stdin);

    idade = anoatual - anonasc;

    printf("vc tem %d anos de idade! \n", idade);
    if(idade > 16){
        printf("Permitida carteira de motorista\n");

        if(idade < 18 || idade >= 70 ){
             printf("Voto facultativo \n");
        } else{
            printf("Voto obrigatorio \n");
        }

    }else if(idade <=16){
        printf("Habilitação negada \n Voto negado.");
    }else {
        printf("Valores Invalidos");
    }

    return 0;
}

