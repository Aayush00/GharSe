package com.example.GharSe.repo;

import com.example.GharSe.model.ChefDetails;
import com.example.GharSe.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChefDetailRepo extends JpaRepository<ChefDetails,Long>{
     Optional<Customer> findIdBychefMobileNumber(String chefMobileNumber) ;

}
