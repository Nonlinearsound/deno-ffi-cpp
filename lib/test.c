#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <thread>
#include <Windows.h>


struct Person {
    std::string name;
    int age;

    Person(char *n, int a) {
        age = a;
        name = std::string(n);
    }
};

extern "C" Person* createPeron(char *name, int age){
    return new Person(name,age);
}

void HelloWorld() {
    printf("Hello from C for Deno\n");
}

void sleep(unsigned int time){
    Sleep(time);
}

char *sendMessage(const char *message) {
    printf("The message is: %s\n",message);
    return (char*)"This is the return fom C";
}

void mousePos(int *pos){
    POINT p;
    GetCursorPos(&p);

    pos[0] = p.x;
    pos[1] = p.y;
}

int main() {}