package cn.edu.whut.sept.zuul.Command;

import cn.edu.whut.sept.zuul.Command.Command;
import cn.edu.whut.sept.zuul.Game;
import cn.edu.whut.sept.zuul.Print;

public class QuitCommand extends Command
{
    public boolean execute(Game game)
    {
        if(hasSecondWord()) {
            Print.print("Quit what?");
            return false;
        }
        else {
            return true;  // signal that we want to quit
        }
    }
}
