package notificator;

import interfaces.IMessageService;

public class Notificator {

    private final IMessageService messageService;

    public Notificator(IMessageService messageService) {
        this.messageService = messageService;
    }

    public void notificate(String message, String to){
        this.messageService.sendMessage(message, to);
    }
}


package services;

import interfaces.IMessageService;

public class EmailServiceImp implements IMessageService {

     public void sendMessage(String message, String to) {
         System.out.println("Enviando mensagem para: " + to + " por EMAIL: " + message);
     }
}


package interfaces;

public interface IMessageService {
    void sendMessage(String message, String to);
}
