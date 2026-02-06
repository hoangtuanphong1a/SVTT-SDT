package org.example.backend.common.base;

import java.io.Serializable;
import java.util.List;

public interface BaseService<T, ID extends Serializable> {
    
    T findById(ID id);
    
    List<T> findAll();
    
    T save(T entity);
    
    T update(ID id, T entity);
    
    void deleteById(ID id);
}