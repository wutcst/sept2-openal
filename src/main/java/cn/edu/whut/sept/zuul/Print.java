package cn.edu.whut.sept.zuul;

import cn.edu.whut.sept.zuul.Command.CommandWords;

import java.util.Iterator;

public class Print {

    public static String s;
    //输入命令
    public static String input;
    //防止输入的命令导致无限循环输出
    public static boolean flag = false;
    public static boolean flag1 = false;
    //保证只开启一次游戏
    public static boolean startGame = false;


    public static void printWelcome(Game game)
    {
        System.out.println();
        System.out.println("Welcome to the World of Zuul!");
        System.out.println("World of Zuul is a new, incredibly boring adventure game.");
        System.out.println("Type 'help' if you need help.");
        System.out.println();
        System.out.println(game.getCurrentRoom().getLongDescription());
    }

    public static void help()
    {
        System.out.println("You are lost. You are alone. You wander");
        System.out.println("around at the university.");
        System.out.println();
        System.out.println("Your command words are:");
    }


    public static void print(String s){
        System.out.println(s);
    }

}
