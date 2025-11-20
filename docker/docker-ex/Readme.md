# Docker Example

### Build Image

```bash
docker build -t basic-node-server .
```

### Run Image

```bash
docker run -it -p 8000:8000 basic-node-server
```

### With ENV

```bash
docker run -it -e PORT=6000 -p 8000:6000 basic-node-server
```
