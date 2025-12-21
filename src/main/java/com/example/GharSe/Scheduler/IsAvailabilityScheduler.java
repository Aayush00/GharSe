package com.example.GharSe.Scheduler;

import com.example.GharSe.model.ChefMenu;
import com.example.GharSe.repo.ChefMenuRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.List;

@Component
@EnableScheduling
public class IsAvailabilityScheduler {

    @Autowired
    ChefMenuRepo chefMenuRepo;

    @Scheduled(fixedDelay = 60000)
    public void issAvailabilityScheduler(){
       List<ChefMenu> chefMenu1=chefMenuRepo.findAll();
       LocalTime now=  LocalTime.now();
       try {
           for (ChefMenu dish : chefMenu1) {
               boolean available = calculateAvailability(now, dish.getStartTime(), dish.getEndTime());
               if (dish.isAvailable() != available) {
                   dish.setAvailable(available);
               }
               if (dish.getQuantity() <= 0 ) {
                   dish.setAvailable(false);
               }else if(!dish.isChefAvailable()){
                   dish.setAvailable(false);
               }
               chefMenuRepo.save(dish);
           }
       }catch (Exception e){
           System.out.println("chefMenu List is Empty " + chefMenu1.size() +e);
       }

    }
    public boolean calculateAvailability(LocalTime now, LocalTime start, LocalTime end) {

        if (start.equals(end)) {
            return true;
        }
        if (start.isBefore(end)) {
            return !now.isBefore(start) && !now.isAfter(end);
        } else {
            return !now.isBefore(start) || !now.isAfter(end);
        }
    }
}
