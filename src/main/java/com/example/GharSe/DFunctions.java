package com.example.GharSe;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DFunctions {
    public Connection connect_to_db(String dbname, String username, String password){
        Connection conn = null;
        try {
            Class.forName("org.postgresql.Driver");
            conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/"+dbname,username,password);
            if(conn!=null){
                System.out.println("Connection Successfully!!!");
            }
            else {
                System.out.println("Connection Failed!!");
            }
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM admin");

            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("adminname");
                System.out.println(id + " | " + name);
            }

            conn.close();

        } catch (Exception e) {
            System.out.print(0);
        }
        return conn;
    }
}
