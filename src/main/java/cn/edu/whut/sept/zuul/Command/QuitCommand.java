package cn.edu.whut.sept.zuul.Command;

import cn.edu.whut.sept.zuul.service.Game;
import cn.edu.whut.sept.zuul.service.Print;

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
