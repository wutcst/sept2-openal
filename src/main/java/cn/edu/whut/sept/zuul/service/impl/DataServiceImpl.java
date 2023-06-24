package cn.edu.whut.sept.zuul.service.impl;
import cn.edu.whut.sept.zuul.dao.DataDao;
import cn.edu.whut.sept.zuul.domain.Save;
import cn.edu.whut.sept.zuul.service.DataService;
import cn.edu.whut.sept.zuul.service.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DataServiceImpl implements DataService {
    @Autowired
    private DataDao dataDao;
    @Override
    public Result saveGameData(Save save) {
        Save save1 = dataDao.getSaveDataByUsername(save.getUsername());
        if (save1 == null) {
            //如果数据库中无该条玩家的游戏信息，保存信息
            int num = dataDao.save(save);
            if (num > 0) {
                return new Result(10,"保存成功");
            }
        } else {
            //如果有信息，那么更新
            if (dataDao.update(save) > 0) {
                return new Result(10,"更新成功");
            }
        }
        return new Result(11,"保存失败");
    }
}
