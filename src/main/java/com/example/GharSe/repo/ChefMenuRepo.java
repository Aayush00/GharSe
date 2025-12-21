package com.example.GharSe.repo;


import com.example.GharSe.model.ChefMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChefMenuRepo extends JpaRepository<ChefMenu,Integer> {

}
