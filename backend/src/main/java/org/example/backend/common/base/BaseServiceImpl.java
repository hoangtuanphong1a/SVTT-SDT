package org.example.backend.common.base;

import org.springframework.data.jpa.repository.JpaRepository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

public abstract class BaseServiceImpl<T, ID extends Serializable> implements BaseService<T, ID> {
    
    protected abstract JpaRepository<T, ID> getRepository();
    
    @Override
    public T findById(ID id) {
        Optional<T> entity = getRepository().findById(id);
        return entity.orElse(null);
    }
    
    @Override
    public List<T> findAll() {
        return getRepository().findAll();
    }
    
    @Override
    public T save(T entity) {
        return getRepository().save(entity);
    }
    
    @Override
    public T update(ID id, T entity) {
        if (!getRepository().existsById(id)) {
            return null;
        }
        return getRepository().save(entity);
    }
    
    @Override
    public void deleteById(ID id) {
        getRepository().deleteById(id);
    }
}