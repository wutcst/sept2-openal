package cn.edu.whut.sept.zuul.Command;

import cn.edu.whut.sept.zuul.Command.Command;
import cn.edu.whut.sept.zuul.Command.CommandWords;
import cn.edu.whut.sept.zuul.Game;
import cn.edu.whut.sept.zuul.Print;

public class HelpCommand extends Command
{
    private CommandWords commandWords;

    public HelpCommand(CommandWords words)
    {
        commandWords = words;
    }

    public boolean execute(Game game)
    {
        Print.help();
        commandWords.showAll();

        return false;
    }
}
