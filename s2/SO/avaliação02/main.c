#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>
#include <stdbool.h>
#include <time.h>

#define NUM_OF_WORKERS 2
#define BUFFER_SIZE 10

typedef struct CriticalSection {
    double buffer[BUFFER_SIZE];
    int in;
    int out;
    int counter;
    pthread_mutex_t mutex;
} criticalSection;

void *producer(void* param);
void *consumer(void* param);

int main(void)
{
    pthread_t worker[NUM_OF_WORKERS];
    pthread_attr_t attr;

    srand(time(NULL)); // para gerar números aleatórios

    criticalSection *csection = (criticalSection*)malloc(sizeof(criticalSection));
    csection->counter = csection->in = csection->out = 0;
    for (size_t i = 0; i < BUFFER_SIZE; ++i)
        csection->buffer[i] = 0.0;
    pthread_mutex_init(&csection->mutex,NULL);

    pthread_attr_init(&attr);
    pthread_create(&worker[0], &attr, producer, csection);
    pthread_create(&worker[1], &attr, consumer, csection);

    pthread_join(worker[0], NULL);
    pthread_join(worker[1], NULL);

    pthread_mutex_destroy(&csection->mutex);
    free(csection);

    return 0;
}

void *producer(void* param)
{
    criticalSection *ptr = (criticalSection*)param;

    while (1) {
        sleep(1); // simula tempo de produção
        double item = (rand() % 100) / 10.0; // número aleatório

        pthread_mutex_lock(&ptr->mutex);

        if (ptr->counter < BUFFER_SIZE) { // buffer não está cheio
            ptr->buffer[ptr->in] = item;
            printf("[Produtor] Produziu %.2f na posição %d\n", item, ptr->in);
            ptr->in = (ptr->in + 1) % BUFFER_SIZE;
            ptr->counter++;
        } else {
            printf("[Produtor] Buffer cheio, esperando...\n");
        }

        pthread_mutex_unlock(&ptr->mutex);
    }
}

void *consumer(void* param)
{
    criticalSection *ptr = (criticalSection*)param;

    while (1) {
        sleep(2); // simula tempo de consumo

        pthread_mutex_lock(&ptr->mutex);

        if (ptr->counter > 0) { // buffer não está vazio
            double item = ptr->buffer[ptr->out];
            printf("[Consumidor] Consumiu %.2f da posição %d\n", item, ptr->out);
            ptr->out = (ptr->out + 1) % BUFFER_SIZE;
            ptr->counter--;
        } else {
            printf("[Consumidor] Buffer vazio, esperando...\n");
        }

        pthread_mutex_unlock(&ptr->mutex);
    }
}
