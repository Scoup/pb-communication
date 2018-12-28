# About

Soft fork [https://github.com/namely/docker-protoc](https://github.com/namely/docker-protoc), so we can generate typescript from proto.

# Doc

Check docker-protoc documentation. You could use "typescript" as language.

# Usage

## Create image

```$ docker build -t docker-protoc-ts:latest```

## Use image to compile code

```$ docker run --rm -v `pwd`:/defs docker-protoc:lastest -d protos -l typescript```

# TODO

Pull request the code on main project.
