package com.framework.blog.exception;

public class FileStorageException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public FileStorageException(String devMessage) {
		super(devMessage);
    }

}