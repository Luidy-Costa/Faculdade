#include <stdio.h>
#include <stdlib.h>
#include "func.h"

struct lista {
    int info;
    struct lista *prox;
};

lista* lst_cria(){
    return NULL;
};

int lst_vazia(lista* l){
    return (l==NULL);
}

