package cn.edu.whut.sept.zuul;

import cn.edu.whut.sept.zuul.Command.Command;
import cn.edu.whut.sept.zuul.Command.CommandWords;

import java.util.Scanner;

public class Parser
{
    private CommandWords commands;  // holds all valid command words
    private Scanner reader;         // source of command input

    public Parser()
    {
        commands = new CommandWords();
        reader = new Scanner(System.in);
    }

    public Command getCommand()
    {
        String inputLine;   // will hold the full input line
        String word1 = null;
        String word2 = null;

        //inputLine = reader.nextLine();
        if(Print.input != null) {
            inputLine = Print.input;
            Print.flag = false;
            Print.flag1 = false;
            //等待用户输入，以回车作为结束的表示
            //如果输入的是go，那么secondWord会被用到，help不会用到
            Scanner tokenizer = new Scanner(inputLine);
            if(tokenizer.hasNext()) {
                word1 = tokenizer.next();      // get first word
                if(tokenizer.hasNext()) {
                    word2 = tokenizer.next();      // get second word
                }
            }
            Print.input = null;

            //获得该命令对应的操作
            Command command = commands.get(word1);
            if(command != null) {
                //如果在命令大全中有这个命令，那么就将用户输入的方向注入
                command.setSecondWord(word2);
            }
            return command;
        }
        Print.flag1 = true;
        return null;
    }
    public void showCommands()
    {
        commands.showAll();
    }
}

